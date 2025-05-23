"""Traffic Sign Classification - Complete Solution.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1YxQY2XhWQ7lY8W7XZ9vQ6jZ3Q2XbZ3Xj
"""

# Step 1: Setup and Installation
!pip install -q tensorflow
import tensorflow as tf
from tensorflow.keras import layers, models, applications
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import os
from PIL import Image
from google.colab import files
import time

# Step 2: Data Preparation with Enhanced Error Handling
def verify_images(directory):
    """Check and remove corrupted images"""
    corrupted_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                img = Image.open(file_path)
                img.verify()
                img.close()
            except (IOError, SyntaxError) as e:
                print(f'Removing corrupted file: {file_path}')
                corrupted_files.append(file_path)
                os.remove(file_path)
    return corrupted_files

# Upload data (manually upload Train folder to Colab)
print("Please upload the 'Train' folder containing your traffic sign images")
# files.upload()  # Uncomment if running interactively

# Verify and clean dataset
corrupted = verify_images('Train')
print(f"Removed {len(corrupted)} corrupted files")

# Step 3: Data Visualization and Augmentation
def plot_augmented_samples(generator, num_samples=5):
    """Visualize augmented images"""
    augmented_images, labels = next(generator)
    class_names = list(generator.class_indices.keys())
    
    plt.figure(figsize=(15, 5))
    for i in range(num_samples):
        plt.subplot(1, num_samples, i+1)
        plt.imshow(augmented_images[i])
        plt.title(class_names[np.argmax(labels[i])])
        plt.axis('off')
    plt.show()

# Create data generators
img_size = 64
batch_size = 32

train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.1,
    zoom_range=0.2,
    horizontal_flip=False,  # Traffic signs shouldn't be flipped
    fill_mode='nearest',
    validation_split=0.2,
    dtype='float32'
)

def safe_flow_from_directory(datagen, directory, **kwargs):
    """Handle problematic images during flow_from_directory"""
    while True:
        try:
            return datagen.flow_from_directory(directory, **kwargs)
        except (IOError, OSError) as e:
            print(f"Error loading image: {e}")
            if 'filename' in str(e):
                bad_file = str(e).split('filename: ')[-1].strip("'")
                if os.path.exists(bad_file):
                    os.remove(bad_file)
                    print(f"Removed problematic file: {bad_file}")

train_generator = safe_flow_from_directory(
    train_datagen,
    'Train',
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical',
    subset='training'
)

val_generator = safe_flow_from_directory(
    train_datagen,
    'Train',
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation'
)

# Visualize augmented samples
print("Augmented Training Samples:")
plot_augmented_samples(train_generator)

class_names = list(train_generator.class_indices.keys())
print("Class Names:", class_names)

# Step 4: Baseline CNN Model
def build_baseline_model(input_shape, num_classes):
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model

baseline_model = build_baseline_model((img_size, img_size, 3), len(class_names))
baseline_model.summary()

# Train baseline model
start_time = time.time()
baseline_history = baseline_model.fit(
    train_generator,
    epochs=15,
    validation_data=val_generator
)
baseline_time = time.time() - start_time

# Evaluate baseline
def evaluate_model(model, history, generator, model_name):
    # Plot training history
    plt.figure(figsize=(12, 4))
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train Accuracy')
    plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
    plt.title(f'{model_name} Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.title(f'{model_name} Loss')
    plt.xlabel('Epoch')
    plt.legend()
    plt.show()
    
    # Classification report
    y_pred = np.argmax(model.predict(generator), axis=1)
    y_true = generator.classes
    print(f"\n{classification_report(y_true, y_pred, target_names=class_names)}")
    
    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=class_names, yticklabels=class_names)
    plt.title(f'{model_name} Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.show()

print("\nBaseline Model Evaluation:")
evaluate_model(baseline_model, baseline_history, val_generator, "Baseline CNN")

# Step 5: Deeper Model with Regularization
def build_deeper_model(input_shape, num_classes):
    model = models.Sequential([
        # Block 1
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Block 2
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Block 3 & 4
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Block 5 & 6
        layers.Conv2D(256, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(256, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Classifier
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model

deeper_model = build_deeper_model((img_size, img_size, 3), len(class_names))
deeper_model.summary()

# Train deeper model
start_time = time.time()
deeper_history = deeper_model.fit(
    train_generator,
    epochs=15,
    validation_data=val_generator
)
deeper_time = time.time() - start_time

print("\nDeeper Model Evaluation:")
evaluate_model(deeper_model, deeper_history, val_generator, "Deeper CNN")

# Step 6: Optimizer Comparison (SGD vs Adam)
deeper_model_sgd = build_deeper_model((img_size, img_size, 3), len(class_names))
deeper_model_sgd.compile(optimizer='sgd', loss='categorical_crossentropy', metrics=['accuracy'])

start_time = time.time()
sgd_history = deeper_model_sgd.fit(
    train_generator,
    epochs=15,
    validation_data=val_generator
)
sgd_time = time.time() - start_time

print("\nSGD Optimizer Evaluation:")
evaluate_model(deeper_model_sgd, sgd_history, val_generator, "Deeper CNN (SGD)")

# Step 7: Transfer Learning with MobileNetV2
def build_transfer_model(input_shape, num_classes):
    base_model = applications.MobileNetV2(
        input_shape=input_shape,
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False  # Freeze base layers
    
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model

# Need new generators for 224x224 input
transfer_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

transfer_train = safe_flow_from_directory(
    transfer_datagen,
    'Train',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

transfer_val = safe_flow_from_directory(
    transfer_datagen,
    'Train',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

transfer_model = build_transfer_model((224, 224, 3), len(class_names))
transfer_model.summary()

# Train transfer model
start_time = time.time()
transfer_history = transfer_model.fit(
    transfer_train,
    epochs=10,  # Fewer epochs needed for transfer learning
    validation_data=transfer_val
)
transfer_time = time.time() - start_time

print("\nTransfer Learning Evaluation:")
evaluate_model(transfer_model, transfer_history, transfer_val, "MobileNetV2")

# Step 8: Comparative Analysis
print("\n=== Comparative Analysis ===")
print(f"{'Model':<20} {'Val Accuracy':<15} {'Training Time':<15}")
print("-" * 50)
print(f"{'Baseline CNN':<20} {max(baseline_history.history['val_accuracy']):<15.4f} {baseline_time:<15.2f}")
print(f"{'Deeper CNN (Adam)':<20} {max(deeper_history.history['val_accuracy']):<15.4f} {deeper_time:<15.2f}")
print(f"{'Deeper CNN (SGD)':<20} {max(sgd_history.history['val_accuracy']):<15.4f} {sgd_time:<15.2f}")
print(f"{'MobileNetV2':<20} {max(transfer_history.history['val_accuracy']):<15.4f} {transfer_time:<15.2f}")

# Step 9: Save Models
baseline_model.save('traffic_baseline.h5')
deeper_model.save('traffic_deeper.h5')
transfer_model.save('traffic_mobilenet.h5')

print("\nModels saved successfully!")
import os
import pandas as pd
import json
from collections import OrderedDict

# Obtiene la ruta del directorio actual
directorio_actual = os.path.dirname(os.path.abspath(__file__))

# Ruta del archivo JSON
ruta_json = os.path.join(directorio_actual, 'parkings.json')

def cargar_datos_desde_json(ruta):
    with open(ruta) as archivo:
        data = json.load(archivo, object_pairs_hook=OrderedDict)
    return data

def limpiar_valor(valor):
    if isinstance(valor, (int, float)):
        return str(valor).replace(".", ",")
    return str(valor)

def crear_parkings_csv(data):
    parkings_data = []
    for parking in data:
        parking_data = {}
        for key, value in parking.items():
            if key not in ["tenantEmail", "docId", "id"]:
                parking_data[key] = limpiar_valor(value)
        parkings_data.append(parking_data)
    
    parkings_df = pd.DataFrame(parkings_data)
    
    nombre_archivo_csv = "parkings.csv"
    ruta_archivo_csv = os.path.join(directorio_actual, nombre_archivo_csv)
    
    parkings_df.to_csv(ruta_archivo_csv, index=False)
    return ruta_archivo_csv

data = cargar_datos_desde_json(ruta_json)
archivo_csv = crear_parkings_csv(data)

print(f"Archivo CSV '{archivo_csv}' creado en el directorio actual.")
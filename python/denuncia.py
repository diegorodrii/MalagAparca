import os
import pandas as pd
import json
from collections import OrderedDict

# Obtiene la ruta del directorio actual
directorio_actual = os.path.dirname(os.path.abspath(__file__))

# Ruta del archivo JSON
ruta_json = os.path.join(directorio_actual, 'denuncias.json')

def cargar_datos_desde_json(ruta):
    with open(ruta) as archivo:
        data = json.load(archivo, object_pairs_hook=OrderedDict)
    return data

def limpiar_valor(valor):
    if isinstance(valor, (int, float)):
        return str(valor).replace(".", ",")
    return str(valor)

def crear_denuncias_csv(data):
    denuncias_data = []
    for denuncia in data:
        denuncia_data = {}
        for key, value in denuncia.items():
            if key not in ["picture", "docId", "id",  "ownerEmail"]:
                denuncia_data[key] = limpiar_valor(value)
        denuncias_data.append(denuncia_data)
    
    denuncias_df = pd.DataFrame(denuncias_data)
    
    nombre_archivo_csv = "denuncias.csv"
    ruta_archivo_csv = os.path.join(directorio_actual, nombre_archivo_csv)
    
    denuncias_df.to_csv(ruta_archivo_csv, index=False)
    return ruta_archivo_csv

data = cargar_datos_desde_json(ruta_json)
archivo_csv = crear_denuncias_csv(data)

print(f"Archivo CSV '{archivo_csv}' creado en el directorio actual.")
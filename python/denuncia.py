import os
import pandas as pd
import json
from collections import OrderedDict

ruta_datos = os.path.join(os.path.dirname(__file__), '')
ruta_datos_json = os.path.join(ruta_datos, 'denuncias.json')

def cargar_datos_desde_json(ruta):
    with open(ruta) as file:
        data = json.load(file, object_pairs_hook=OrderedDict)
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
    
    denuncias_df.to_csv(nombre_archivo_csv, index=False)
    return nombre_archivo_csv

data = cargar_datos_desde_json(ruta_datos_json)
archivo_csv = crear_denuncias_csv(data)

print(f"Archivo CSV de denuncias '{archivo_csv}' creado exitosamente.")

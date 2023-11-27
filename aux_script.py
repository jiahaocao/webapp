import json
import numpy as np
import pandas as pd

def todict(row):
    product = row['Product Name']
    brand, model = product.split(':')
    brand = brand.strip()
    model = model.strip()
    aux = {}
    for key, val in row.items():
        if type(val) == np.int64: val = int(val)
        if type(val) == np.float64: val = float(val)
        aux[key] = val
    aux.pop('Product Name')
    return model, json.dumps(aux)

for i in range(df.shape[0]):
    model, aux = todict(df.iloc[i, :])
    Prod = Product.objects.get(model=model)
    Prod.aux = aux
    Prod.save()



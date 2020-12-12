from DynamoFuncs import *
from urllib.parse import unquote

tableName = 'laughtrackbackend-dev-ApplicationDynamoDBTable-158G3YYV8WY3I' # aws dynamodb list-tables --region us-east-1

def insertRow(event, context):
    print(event)
    body = event['body']
    insertItemToTable(tableName, json.loads(body))
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }
    response = {
        "headers": {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': True},
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response

def getRows(event, context):
    print(event)
    body = json.loads(event['body'])
    key = unquote(body['key'])
    value = unquote(body['value'])
    print(key)
    print(value)
    r = getItemsFromTable(tableName, Key(key).eq(value))
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        # "input": event,
        "result": r
    }
    response = {
        "headers": {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': True},
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response    


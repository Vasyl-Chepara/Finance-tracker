from flask import Flask, jsonify, request
import sqlite3
# from werkzeug.utils import secure_filename

app = Flask(__name__)



@app.route('/overview/', methods=['GET'])
def get_overview():
    if request.method == 'GET':
        conn = sqlite3.connect('finance_database.db')
        cursor = conn.cursor()
        command = '''SELECT * FROM Financies'''
        cursor.execute(command)
        data = cursor.fetchall()
        data.sort(key=lambda data: data[1])
        processed_data = {
        'Expenses_by_month': {},
        'Expenses_by_categories': {},
        'Last_expenses': [],
        'Invests': {},
        'Savings': {'Total_savings' : 0}
        }
        for i in data:
            if i[2] == 'Expenses':

                if len(processed_data['Last_expenses']) < 7:
                    processed_data['Last_expenses'].append([i[0],i[3],i[1]])
    
                if i[1] not in processed_data:
                    processed_data['Expenses_by_month'][i[1]] = i[3]
                else:
                    processed_data['Expenses_by_month'][i[1]] += i[3]
    
                if i[0] not in processed_data:
                    processed_data['Expenses_by_categories'][i[0]] = i[3]
                else:
                    processed_data['Expenses_by_categories'][i[0]] += i[3]
    
            elif i[2] == 'Invests':
                if i[0] not in processed_data['Invests']:
                    processed_data['Invests'][i[0]] = i[3]
                else:
                    processed_data['Invests'][i[0]] += i[3]
    
            elif i[2] == 'Savings':
                processed_data['Savings']['Total_savings'] += i[3]
        
      

        return jsonify(processed_data)


@app.route('/transactions/<value>', methods=['GET', 'POST'])
def transactions(value):
    conn = sqlite3.connect('finance_database.db')
    cursor = conn.cursor()
    command = '''SELECT * FROM Financies LIMIT {0}'''.format(value)
    cursor.execute(command)
    data = cursor.fetchall()
    data.sort(key=lambda data: data[1])
    return jsonify(data)



@app.route('/sheduler', methods=['GET', 'POST'])
def sheduler():

    return jsonify('sheduler',200)



if __name__ == '__main__':
    app.run(debug = True)
    # show_data()

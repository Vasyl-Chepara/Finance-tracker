import sqlite3
import random
import numpy as np
import collections
import os


def create_db():

	conn = sqlite3.connect('finance_database.db')
	cursor = conn.cursor()
	cursor.execute("""CREATE TABLE Financies
	                  (Name_of_transaction text, Date_of_trancastion date, 
	                  Type_of_trancastion text, Value_of_trancastion real)
	               """)
	conn.commit()

def generate_data():
	conn = sqlite3.connect('finance_database.db')
	cursor = conn.cursor()
	expenses_types = ['Rent apartments', 'Food', 'Car', 'Investments', 'Relax', 'Gifts']
	transactions_types = ['Expenses', 'Invests', 'Savings']

	for i in range(120):
		transaction = [random.choice(expenses_types), '{0}/{1}/2020'.format(random.randint(1, 28), random.randint(1, 7)), random.choice(transactions_types), round(random.uniform(1, 100),2) ]
		cursor.executemany("INSERT INTO Financies VALUES (?,?,?,?)", (transaction,))
		print(i/120)
	
	conn.commit()


def show_data():
	conn = sqlite3.connect('finance_database.db')
	cursor = conn.cursor()
	command = '''SELECT * FROM Financies'''
	cursor.execute(command)
	data = cursor.fetchall()
	print(data)

def sort_data():
	conn = sqlite3.connect('finance_database.db')
	cursor = conn.cursor()
	command = '''SELECT * FROM Financies LIMIT 1,180'''
	# SELECT * FROM table limit 100, 200`
	cursor.execute(command)
	data = cursor.fetchall()
	# print(data)
	data.sort(key=lambda date: date[1])
	data.reverse()
	print(data)
	
	# ('Relax', '15/7/2020', 'Invests', 83.73)
# [('Food', '15/4/2020', '
# ', 24.09), ('Car', '15/5/2020', 'Invests', 10.27),

if __name__ == "__main__":
	# create_db()
	generate_data()
	#show_data()
	sort_data()
	# print(os.getcwd())
import os
import time
from flask import Flask,render_template
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin
from flask import jsonify
from flask import request
import pymysql
from flask import send_from_directory

app = Flask(__name__,static_folder='build', static_url_path='/',template_folder='build')
# app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return render_template('index.html')

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Jack@1234'
app.config['MYSQL_DATABASE_DB'] = 'bloodbank'
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_HOST'] = 'host.docker.internal'
mysql.init_app(app)

@app.route('/time')
def get_current_time():
    print(mysql)
    return {'time': time.time()}

@app.route('/users')
def users():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM logindetails;")
        empRows = cursor.fetchall()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close() 

@app.route('/getdoctors')
def getdoctors():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM doctor;")
        empRows = cursor.fetchall()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
            cursor.close() 
            conn.close() 

@app.route('/getdonors')
def getdonors():
    try:
        conn = mysql.connect()
        print(conn)
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM donor;")
        empRows = cursor.fetchall()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/getinventory')
def getinventory():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM inventory;")
        empRows = cursor.fetchall()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/getreceiver')
def getreceiver():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM receiver;")
        empRows = cursor.fetchall()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/deletedonor', methods=['POST'])
def deletedonor():
    try:        
        _json = request.json
        _id = _json['id']
        print(_json)
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "DELETE FROM donor WHERE id =%s"
            bindData = (_id)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Donor deleted successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/deletereceiver', methods=['POST'])
def deletereceiver():
    try:        
        _json = request.json
        _id = _json['id']
        print(_json)
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "DELETE FROM receiver WHERE id =%s"
            bindData = (_id)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Receiver deleted successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/deletedoctor', methods=['POST'])
def deletedoctor():
    try:        
        _json = request.json
        _id = _json['id']
        print(_json)
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "DELETE FROM doctor WHERE id =%s"
            bindData = (_id)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Doctor deleted successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/deleteinventory', methods=['POST'])
def deleteinventory():
    try:        
        _json = request.json
        _id = _json['id']
        print(_json)
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "DELETE FROM inventory WHERE id =%s"
            bindData = (_id)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Inventory deleted successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()
@app.route('/createlogin', methods=['POST'])
def create_login():
    try:        
        _json = request.json
        _name = _json['username']
        _email = _json['password']
        if _name and _email and request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "INSERT INTO logindetails(username, password) VALUES(%s, %s)"
            bindData = (_name, _email)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Login details added successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/createinventory', methods=['POST'])
def createinventory():
    try:        
        _json = request.json
        _bgname = _json['bgname']
        _quatity = _json['quantity']
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "INSERT INTO inventory(bgname,quantity) VALUES(%s, %s)"
            bindData = (_bgname,_quatity)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Inventory added successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/createdoctor', methods=['POST'])
def create_doctor():
    try:        
        _json = request.json
        _name = _json['name']
        _contact = _json['contact']
        _address = _json['address']
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "INSERT INTO doctor(doctorname,doctoraddress,doctorcontact) VALUES(%s, %s,%s)"
            bindData = (_name,_address,_contact)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Doctor details added successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/updatequantity', methods=['POST'])
def updatequantity():
    try:        
        _json = request.json
        _bgname = _json['bgname']
        _quantity = _json['quantity']
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "Update inventory set quantity=%s where bgname=%s"
            bindData = (_quantity,_bgname)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Inventory details updated successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()    

@app.route('/createreceiver', methods=['POST'])
def create_receiver():
    try:        
        _json = request.json
        _name = _json['name']
        _gender = _json['gender']
        _address = _json['address']
        _date = _json['date']
        _quantity = _json['quantity']
        _contact = _json['contact']
        _bg = _json['bloodgroup']
        _doctorid = _json['doctorId']
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "INSERT INTO receiver(receivername,gender,address,date,quantity,contact,bg,doctorid) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
            bindData = (_name, _gender,_address,_date,_quantity,_contact,_bg,_doctorid)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Receiver details added successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()            

@app.route('/createdonor', methods=['POST'])
def create_donor():
    try:        
        _json = request.json
        _name = _json['name']
        _gender = _json['gender']
        _address = _json['address']
        _date = _json['date']
        _quantity = _json['quantity']
        _contact = _json['contact']
        _bg = _json['bloodgroup']
        _doctorid = _json['doctorId']
        if request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "INSERT INTO donor(name, gender,address,date,quantity,contact,bg,doctorid) VALUES(%s, %s,%s,%s,%s,%s,%s,%s)"
            bindData = (_name, _gender,_address,_date,_quantity,_contact,_bg,_doctorid)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Doner details added successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()   

@app.errorhandler(404)
def showMessage(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone

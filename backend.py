from flask import Flask, request
from flask_cors import CORS
import json
#pip3 install -U flask-cors

app = Flask(__name__) 
CORS(app)
student_grades_list = {}
@app.route('/')
def hello_world():
    return 'hello World'


@app.route('/grades', methods = ['GET', 'POST'])
def grades():
    print("a")
    with open('grades.json','r') as f:
        student_grades_list = json.load(f)
    #print(student_grades_list)
    #print(type(student_grades_list))
    if (request.method == 'POST'):
        #print("a")
        #print(request.data.decode('UTF-8'))
        #print(type(request.data.decode('UTF-8')))
        obj = json.loads(request.data.decode('UTF-8'))

        print(student_grades_list)

        n = list(obj.keys())[0]
        student = {n : list(obj.values())[0]}

        isAlready = False
        for obj in student_grades_list:
            
            if ((list(obj.keys())[0]).lower() == n.lower()):
                isAlready = True
                break

        if (isAlready == False):
            student_grades_list.append(student)

        print(student_grades_list)
        
        print(type(student_grades_list))

        with open("grades.json", "w") as outfile:
            json.dump((student_grades_list),outfile)                 #currently rewrites 

        
        
        return student_grades_list
    else:
        return student_grades_list

@app.route ('/grades/<name>')
def student_grade(name):
   
    with open('grades.json','r') as f:
        student_grades_list = json.load(f)
    print(student_grades_list)
    for  obj in (list(student_grades_list)):
        print(name)
        print(list(obj.keys())[0])
        print(type(name))
        print(type(list(obj.keys())[0]))

        if ((list(obj.keys())[0]).lower() == name.lower()):
            print("yes")
            student = {} #make new dict to return
            student[list(obj.keys())[0]] = list(obj.values())[0]
            return student
        
        
    





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
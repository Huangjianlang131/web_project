from flask import Flask, request
import os

app = Flask(__name__)

def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)
        return '创建成功'
    else:
        return '创建失败'

#创建文件夹
@app.route('/file_create', methods=['POST'])
def file_create():
    filename = request.form.get('filename')
    filepath_father = request.form.get('filepath_father')
    msg = create_directory('/home/jujia' + filepath_father + '/' + filename)
    return msg

#存储文件
@app.route('/excel_save', methods=['POST'])
def excel_save():
    if 'file' not in request.files:
        return '无文件'
    file = request.files['file']
    if file:
        filepath_father = request.form.get('filepath_father')
        file.save('/home/jujia' + filepath_father + '/' + file.filename)
        return '保存成功'

#获取当前路径下的所有文件名
@app.route('/get_filename', methods=['POST'])
def get_filename():
    filepath = request.form.get('filepath')
    file_names = []
    for file_name in os.listdir('/home/jujia' + filepath):
        file_names.append(file_name)
    return file_names

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9081)

from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from os import listdir
import os
from os.path import isfile, isdir, join
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

# def get_index(request):

#     return render(request,'index.html',locals())

mypath = "./static/img/"
url = '/static/img/'

def get_index(request):
    fls = get_filelist()
    # print(fls)

    return render(request,'index.html', {
            'fls' : fls,
            'url' : url 
        })
    
def get_upload(request):
    
    if request.method == 'POST' and request.FILES['myfile']:
        print(request.FILES['myfile'])
        print(type(request.FILES['myfile']))

        ts = str(int(time.time()))

        myfile = request.FILES['myfile']
        datatype = myfile.name[-4:-1] + myfile.name[-1]
        fs = FileSystemStorage('./static/img/')
        filename = fs.save(ts+datatype, myfile)
        uploaded_file_url = fs.url('/static/img/'+filename)

        print('上傳成功')
        return redirect("/index")

    else:
        print('上船失敗')

    return render(request,'upload.html')


def get_filelist():
     # 取得所有檔案與子目錄名稱
    files = listdir(mypath)
    fls = []

    # 以迴圈處理
    for f in files:
        # 產生檔案的絕對路徑
        fullpath = join(mypath, f)
        # 判斷 fullpath 是檔案還是目錄
        if isfile(fullpath):
            fls.append(f)
    # print(fls)
    return  sorted(fls)

def testbutton(request):
    print('按鍵啟動~~~~')
    pic = request.POST['test111']
   
    os.remove(mypath + pic)#檔案路徑和名稱
    print('刪除檔案',pic)

    return redirect("/index")


# '-------------api----------------------------'

def get_pic_api(request):

    fls = get_filelist()
    print('取得圖片列表成功')
    response =  JsonResponse({
        'Text': '取得圖片列表成功',
        'fls' : fls,
        'url' : url 
        })

    return  response

@csrf_exempt
def delet_pic_api(request):
    Inputdata = json.loads(request.body.decode())
    print('Delet-API')
    print(Inputdata.get('pic'))
    pic = Inputdata.get('pic')
    os.remove(mypath + pic)#檔案路徑和名稱
    print('刪除檔案',pic)
        
    
    response =  JsonResponse({
        'Text': pic + '刪除成功',
    })





    return  response





@csrf_exempt
def upload_pic(request):
    # Inputdata = request
    # print(type(request.body.FILES.get('file',None)))

    # if request.method == 'POST' and request.FILES['file']:
    # request.body.open


    if request.method == 'POST' and request.FILES.getlist('file'):

        for f in request.FILES.getlist('file'):
            myfile = f

            fs = FileSystemStorage('./static/img/')
            filename = fs.save(myfile.name, myfile)
            uploaded_file_url = fs.url('/static/img/'+filename)
            print(myfile.name,'上傳成功')

            response =  JsonResponse({
            'Text': '上傳成功!!~~',
            })
        return  response

    else:
        print('上傳失敗')
        response =  JsonResponse({
        'Text': '上傳失敗!!~~',
        })

        return  response


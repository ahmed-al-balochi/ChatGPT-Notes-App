from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer


def getNotesList(request):
    document = Document.objects.all().order_by('-modified_at')
    serializer = DocumentSerializer(document, many=True)
    return Response(serializer.data)

def getNoteDetail(request, pk):
    # TODO if else statment to check out of bound notes
    document = Document.objects.get(id=pk)
    serializer = DocumentSerializer(document, many=False)
    return Response(serializer.data)

def createNote(request):
    data = request.data
    document = Document.objects.create(
        title = data['title'],
        content = data['content']
    )
    serializer = DocumentSerializer(document, many=False)
    return Response(serializer.data)

def updateNote(request, pk):
    data = request.data
    document = Document.objects.get(id=pk)
    serializer = DocumentSerializer(instance=document, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

def deleteNote(request, pk):
    note = Document.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')

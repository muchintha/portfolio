from PyPDF2 import PdfReader
p='public\\Muchintha_InternshalaResume_(1).pdf'
reader=PdfReader(p)
texts=[]
for i,page in enumerate(reader.pages):
    t=page.extract_text()
    if t:
        texts.append(f"\n--- Page {i+1} ---\n"+t)
full='\n'.join(texts)
print(full)

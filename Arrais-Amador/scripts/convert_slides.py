import os
import json
import pypdfium2 as pdfium
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_SLIDES_DIR = os.path.join(BASE_DIR, 'public', 'slides')
DATA_DIR = os.path.join(BASE_DIR, 'public', 'data')

SOURCE_DIR = r'G:\Meu Drive\02 - Marinha & Trabalho\Marinha\01 - CFT (Local Atual)\2026\ITINERANTE\01 - TNT x JUT (OUT26)\01 - ARRAIS-AMADOR\01 - AULAS'

LESSONS = [
    {
        "id": "aula-1",
        "day": 1,
        "title": "Dia 1 — Legislação Náutica e Normas",
        "subtitle": "NORMAM-211/212/DPC, LESTA, RLESTA e Competências da Autoridade Marítima",
        "category": "Legislação Náutica",
        "instructor": "Instrutor 1",
        "pdfPattern": "Dia_1_-_UE_1__Legislação_Náutica_e_Normas_(Instrutor_1)_(2).pdf"
    },
    {
        "id": "aula-2",
        "day": 2,
        "title": "Dia 2 — RIPEAM-72 (Regras, Luzes e Sinais)",
        "subtitle": "Regras de Governo, Faróis de Navegação, Luzes Noturnas e Sinais Sonoros",
        "category": "RIPEAM",
        "instructor": "Instrutor 1",
        "pdfPattern": "Dia_2_-_UE_2__RIPEAM-72_-_Regras,_Luzes_e_Sinais_(Instrutor.pdf"
    },
    {
        "id": "aula-3",
        "day": 3,
        "title": "Dia 3 — Balizamento, Nomenclatura e Manobra",
        "subtitle": "Sistema IALA Região B, Nomenclatura Náutica, Cabos, Atracação e Fundeio",
        "category": "Balizamento",
        "instructor": "Instrutor 2",
        "pdfPattern": "Dia 3 - UE 3 Balizamento, Nomenclatura e Manobra (Instrutor 2).pdf"
    },
    {
        "id": "aula-4",
        "day": 4,
        "title": "Dia 4 — Primeiros Socorros, Salvatagem e Incêndio",
        "subtitle": "Equipamentos de Salvatagem, Classes de Incêndio, Homem ao Mar e Emergências",
        "category": "Primeiros Socorros, Salvatagem e Incêndio",
        "instructor": "Instrutor 2",
        "pdfPattern": "Dia 4",
        "isUpcoming": True
    }
]

def main():
    os.makedirs(PUBLIC_SLIDES_DIR, exist_ok=True)
    os.makedirs(DATA_DIR, exist_ok=True)

    available_files = []
    if os.path.exists(SOURCE_DIR):
        available_files = os.listdir(SOURCE_DIR)
        print(f"Encontrados {len(available_files)} arquivos na pasta de origem.")
    else:
        print(f"AVISO: Pasta de origem não encontrada: {SOURCE_DIR}")

    lessons_output = []

    for lesson in LESSONS:
        lesson_id = lesson["id"]
        target_dir = os.path.join(PUBLIC_SLIDES_DIR, lesson_id)
        os.makedirs(target_dir, exist_ok=True)

        if lesson.get("isUpcoming"):
            # Check if PDF for Aula 4 was added
            matching_files = [f for f in available_files if lesson["pdfPattern"].lower() in f.lower() and f.endswith(".pdf")]
            if not matching_files:
                lessons_output.append({
                    "id": lesson["id"],
                    "day": lesson["day"],
                    "title": lesson["title"],
                    "subtitle": lesson["subtitle"],
                    "category": lesson["category"],
                    "instructor": lesson["instructor"],
                    "totalSlides": 0,
                    "folder": f"slides/{lesson_id}",
                    "isUpcoming": True,
                    "slides": []
                })
                print(f"Aula {lesson['day']} marcada como 'Em breve / Amanhã'.")
                continue
            else:
                pdf_filename = matching_files[0]
                lesson["isUpcoming"] = False
        else:
            pdf_filename = lesson["pdfPattern"]

        pdf_path = os.path.join(SOURCE_DIR, pdf_filename)
        if not os.path.exists(pdf_path):
            # Try fuzzy match in source dir
            matches = [f for f in available_files if f.lower().startswith(lesson["id"].replace("-", "")) or (f.endswith(".pdf") and str(lesson["day"]) in f)]
            if matches:
                pdf_path = os.path.join(SOURCE_DIR, matches[0])
            else:
                print(f"Erro: Arquivo PDF não encontrado para {lesson_id}: {pdf_filename}")
                continue

        print(f"Processando {lesson_id}: {os.path.basename(pdf_path)}...")
        doc = pdfium.PdfDocument(pdf_path)
        total_pages = len(doc)
        slides_list = []

        for i in range(total_pages):
            page_num = i + 1
            filename = f"slide-{page_num}.webp"
            out_path = os.path.join(target_dir, filename)

            # Only render if doesn't exist or is empty
            if not os.path.exists(out_path) or os.path.getsize(out_path) == 0:
                page = doc[i]
                # Scale 1.5 yields ~2064x1152 Full HD quality, optimal for readability & speed
                img = page.render(scale=1.5).to_pil()
                img.save(out_path, "WEBP", quality=82)
                size_kb = os.path.getsize(out_path) // 1024
                print(f"  [{lesson_id}] Renderizado {filename} ({size_kb} KB)")
            else:
                print(f"  [{lesson_id}] {filename} já existe, mantendo cache.")

            slides_list.append({
                "number": page_num,
                "image": f"./slides/{lesson_id}/{filename}"
            })

        lessons_output.append({
            "id": lesson["id"],
            "day": lesson["day"],
            "title": lesson["title"],
            "subtitle": lesson["subtitle"],
            "category": lesson["category"],
            "instructor": lesson["instructor"],
            "totalSlides": total_pages,
            "folder": f"slides/{lesson_id}",
            "isUpcoming": False,
            "slides": slides_list
        })

    json_path = os.path.join(DATA_DIR, 'slides.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(lessons_output, f, ensure_ascii=False, indent=2)

    print(f"\nConcluído com sucesso! Gerado: {json_path}")
    print(f"Total de aulas configuradas: {len(lessons_output)}")

if __name__ == '__main__':
    main()

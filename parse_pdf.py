import pdfplumber

pdf_path = "WORKFORCE-2018-TEST-Opt.unlocked-2.pdf"

with pdfplumber.open(pdf_path) as pdf:
    print(f"Total pages: {len(pdf.pages)}")
    
    # Read first 3 pages
    print("\n--- PAGE 1-3 ---")
    for i in range(3):
        print(f"--- PAGE {i+1} ---")
        text = pdf.pages[i].extract_text()
        print(text[:1000] if text else "[No text]")
        
    # Read answer pages
    for p_num in [49, 101, 152]:
        if p_num <= len(pdf.pages):
            print(f"\n--- PAGE {p_num} ---")
            text = pdf.pages[p_num - 1].extract_text() # 0-indexed
            print(text[:1000] if text else "[No text]")

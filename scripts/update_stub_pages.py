import os

root_dir = r"e:\Projects\icaa\app\2027"
for subdir in os.listdir(root_dir):
    subdir_path = os.path.join(root_dir, subdir)
    if os.path.isdir(subdir_path):
        page_path = os.path.join(subdir_path, "page.tsx")
        if os.path.exists(page_path):
            with open(page_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Check if it contains "To be announced soon!" and is a stub
            if "To be announced soon!" in content and "Back to Home" not in content:
                print(f"Updating {page_path}")
                # Add imports
                new_imports = 'import Link from "next/link";\nimport { FaArrowLeft } from "react-icons/fa6";\nimport type { Metadata }'
                content = content.replace("import type { Metadata }", new_imports)
                
                # Add button before the closing tag of the main div
                button_jsx = """
      <Link href="/2027">
        <button className="group mt-6 flex items-center gap-2 px-6 py-3 border-2 border-ink bg-surface text-ink font-bold -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_var(--color-ink)] hover:bg-border active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-150 cursor-pointer">
          <FaArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>
      </Link>
    </div>"""
                # Replace the last `</div>`
                if content.strip().endswith("</div>\n  );\n}"):
                    content = content.replace("</div>\n  );\n}", button_jsx + "\n  );\n}")
                elif content.strip().endswith("</div>\n  );\n}\n"):
                    content = content.replace("</div>\n  );\n}\n", button_jsx + "\n  );\n}\n")
                else:
                    # Generic replace for the last </div>
                    r_index = content.rfind("</div>")
                    if r_index != -1:
                        content = content[:r_index] + button_jsx + content[r_index + 6:]
                
                with open(page_path, "w", encoding="utf-8") as f:
                    f.write(content)
print("Done!")

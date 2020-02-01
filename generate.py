import sys
import os
import yaml
from jinja2 import Environment, FileSystemLoader, select_autoescape, Markup
from shutil import copyfile
import weasyprint
import pdfkit
import markdown

if __name__ == '__main__':

    if len(sys.argv) < 2:
        print("Usage: python generate.py <yaml file>")
        sys.exit(1)

    # Load data from yaml
    with open(sys.argv[1], encoding="utf8") as f:
        data = yaml.safe_load(f)

    md = markdown.Markdown(extensions=['meta'])

    # Render with jinja2
    env = Environment(
        loader=FileSystemLoader('./'),
        autoescape=select_autoescape(['html', 'xml']),
        trim_blocks=True,
        lstrip_blocks=True
    )
    env.filters['markdown'] = lambda text: Markup(md.convert(text))

    template = env.get_template(data["config"]["template"])
    html_output = template.render(data)
    with open(data["config"]["out"]["html"], 'w', encoding="utf8") as f:
        f.write(html_output)

    # convert generated html to pdf
    if "pdf" in data["config"]["out"].keys():
        options = {
            'page-size': 'A4',
            'margin-top': '2cm',
            'margin-right': '1cm',
            'margin-bottom': '1.5cm',
            'margin-left': '2cm',
            'encoding': "UTF-8",
        }
        # tempFolder = "tmp"
        #

        pdfkit.from_file(data["config"]["out"]["html"], data["config"]["out"]["pdf"], options=options)

        #
        Style = weasyprint.CSS(string='''
            @page {
                size: A4 portrait;
                max-height:100%;
                max-width:100%;
                }
        ''')

        weasyprint.HTML(data["config"]["out"]["html"]).write_pdf("cv2.pdf", zoom=1, stylesheets=[Style])

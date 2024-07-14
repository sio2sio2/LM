# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information
from datetime import date

project = 'Lenguajes de Marcas'
copyright = ('CC BY 4.0, 2023-' + str(date.today().year) +
             ', José Miguel Sánchez Alés')
author = 'José Miguel Sánchez Alés'
release = 'rolling'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.todo',
    'sphinx.ext.mathjax',
    'sphinx.ext.githubpages',
    'sphinx.ext.extlinks',
    'sphinx.ext.intersphinx',
    'sphinx_design',
    'sphinx_multitoc_numbering'
]

templates_path = ['_templates']
exclude_patterns = []

language = 'es'

todo_include_todos = True

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'cloud'

html_theme_options = { "defaultcollapsed": True,
                       "borderless_decor": False }
#html_theme = 'piccolo_theme'

html_static_path = ['_static']
html_logo = "_static/logo.png"

rst_epilog = """
.. |XML| replace:: :abbr:`XML (eXtensible  Markup Language)`
.. |HTML| replace:: :abbr:`HTML (HyperText Markup Language)`
.. |URL| replace:: :abbr:`URL (Uniform Resource Locator)`
.. |JSON| replace:: :abbr:`JSON (JavaScript Object Notation)`
.. _Javascript: https://es.wikipedia.org/wiki/JavaScript
"""

intersphinx_mapping = {
    'linux': ('https://sio2sio2.github.io/doc-linux/', None),
}

extlinks = {
    'devmoz': ('https://developer.mozilla.org/en-US/docs/Web/HTML/Element/%s#technical_summary',
               '%s'),
    'devmozcss': ('https://developer.mozilla.org/en-US/docs/Web/CSS/%s', '%s'),
    'deb': ('https://packages.debian.org/stable/%s','%s'),
    'jsonschema': ('https://json-schema.org/understanding-json-schema/reference/%s.html','%s')
}

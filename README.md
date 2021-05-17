# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list
http://joxi.ru/J2bdjl8UgG5MPr

# Получаем контакт по id

node index.js --action get --id 5
http://joxi.ru/EA40VvPCvOMvQA

# Добавялем контакт

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
http://joxi.ru/eAO8v1Qc6pDEbr

# Удаляем контакт

node index.js --action remove --id=3
http://joxi.ru/MAjnjl4U1xo8xA

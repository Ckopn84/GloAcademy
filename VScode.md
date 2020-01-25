#VS Code

Для открытия пользовательских настроек VS Code необходимо нажать комбинацию клавиш <kbd>ctrl+shift+p</kbd> или <kbd>F1</kbd>. Затем ввести `open user setting` и выбрать пункт в раскрывающемся меню `Preferences: Open User Settings`.

##Установка bash в качесте консоли по умолчанию в VS Code

###Вариант 1

Дабавить в пользовательских настройках (файл `settings.json`) строку:
```
{
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"
}
```

###Вариант 2

Нажать комбинацию клавиш <kbd>ctrl+shift+p</kbd> или <kbd>F1</kbd> и ввести `select default shell` и выбрать пункт в раскрывающемся меню `Terminal: Select Default Shell`. После этого выбрать `Git Bash`.

##Настройка JSHINT

Бесплатный, с открытым исходным кодом инструмент для проверки кода JavaScript. Его легко настроить для соответствия определенным требованиям к коду и условиям его выполнения. Нужно просто отметить необходимые опции и среду выполнения кода (браузер, ES5, Node.js, Rhino), что позволяет распознавать предопределенные глобальные переменные.

Настраить jshint можно, добавив в проект файл с именем `.jshintrc`, например:
```
{
	"camelcase" : true,
	"indent": 2,
	"undef": true,
	"quotmark": false,
	"maxlen": 120,
	"trailing": true,
	"curly": true,
	"strict": false,
	"browser": true,
	"devel": true,
	"jquery": true,
	"esversion": 6,
	"eqeqeq": true,
	"latedef": true,
	"noempty": true,
	"funcscope": true,
}
```
или в настройках VS Code:
```
{
    "jshint.options": {
        "camelcase" : true,
        "indent": 2,
        "undef": true,
        "quotmark": false,
        "maxlen": 120,
        "trailing": true,
        "curly": true,
        "strict": false,
        "browser": true,
        "devel": true,
        "jquery": true,
        "esversion": 6,
        "eqeqeq": true,
        "latedef": true,
        "noempty": true,
        "funcscope": true,
    }
}
```
Настройка `"esversion": 6` избавляет от появления ошибок вида:
```
'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6')
// синтаксис функции стрелки ( = > ) ' доступен только в ES6 (используйте 'esversion: 6')
```

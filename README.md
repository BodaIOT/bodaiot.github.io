# CatPilot
Это программа позаоляет управлять Windows посредством VBS скриптов через локальную сеть или публичный IP (на подобии webhooks), или с помощью телеграмм бота

![Static Badge](https://img.shields.io/badge/diemonic1-CatPilot-CatPilot)
![GitHub top language](https://img.shields.io/github/languages/top/diemonic1/CatPilot)
![GitHub](https://img.shields.io/github/license/diemonic1/CatPilot)
![GitHub Repo stars](https://img.shields.io/github/stars/diemonic1/CatPilot)
![GitHub issues](https://img.shields.io/github/issues/diemonic1/CatPilot)

## Как писать скрипты   
VBS позволяет реализовать большинство полезных скриптов. Вот обыкновенный шаблон для скрипта:   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run("")
```
   
С помощью WShell.Run("") можно запускать любые команды, в том числе и выполнение .bat скриптов, пайтон скриптов или просто команд для cmd.   

>Чтобы при запуске пайтон скрипт не показывал консоль, а исполнялся в фоне, достаточно переименовать файл скрипта ScriptName.py в ScriptName.pyw, изменив расширение   
   
Для обозначения комментария внутри VBS можно использовать символ '   
Комментарии будут выделяться цветом в редакторе   
   
В качестве имени скрипта вы можете любые символы UTF-8, в том числе и текстовые смайлики 😻.   
   
URL скрипта может состоять только из латинских символов и цифр. Имена или URL двух разных скриптов дублироваться не могут.   
   
Именно по URL вы можете запустить выполнение скрипта.   
   
## Пример   
Я создаю скрипт с URL="RunNotepad" и именем "📄 Запустить блокнот 📄":   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run("notepad.exe")
```
   
>Скрипты, имена и URL можно вставлять и копировать, если включен ввод на английском языке

IP адрес моего компьютера в локальной сети - 192.168.0.102, значит, запустить скрипт я могу создав GET-запрос (открыв в браузере, например) к 192.168.0.102:5000/RunNotepad   
после этого у меня откроется блокнот   

>Ваш роутер может динамически присваивать устройством IP адреса, поэтому, чтобы не менять каждый раз ссылку, по который вы запускается команды, либо отключите динамическое распределение в его настройках, либо закрепите за своим устройством конкретный IP   
   
## Дополнительные нажатия клавиш   
К каждому скрипту вы можете добавить клавиши, которые будут эмулироваться во время его выполнения. Например, выбрав клавишу "f5" можно эмулировать ее нажатие   
|   f5 |
|:-----|
|    + |
| None |
|    + |
| None |

Задав несколько клавиш, можно вызвать клавишное сочетание. Например, ctrl+shift+escape вызовет диспетчер задач (будет эмулироваться зажатие клавиш):   
|   ctrl |
|:-------|
|      + |
|  shift |
|      + |
| escape |

Если вам не нужен скрипт, а только эмуляция клавиш, вы можете вставить внутрь скрипта только комментарий, например 'only buttons click   
## Готовые примеры скриптов   
### Запустить программу, в пути до которой есть пробелы   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run Chr(34) & "C:\Program Files (x86)\Steam\steam.exe"
```
### Убить какую-нибудь программу (например FxSound.exe)   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run "taskkill /F /IM FxSound.exe", 0
```
### Запустить скрипт пайтон   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run("C:\Programs\Test\Check.pyw")
```
### Открыть страницу в браузере   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run "https://www.google.com/"
```
### Перезапустить ПК   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run "shutdown.exe -r -f -t 00"
```
### Выключить компьютер   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run "shutdown.exe /s /t 5"
```
### Усыпить компьютер   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run "rundll32.exe powrprof.dll,SetSuspendState Sleep"
```
### Следующий трек/видео   
| nexttrack |
|:----------|
|         + |
|      None |
|         + |
|      None |

### Предыдущий трек/видео   
| prevtrack |
|:----------|
|         + |
|      None |
|         + |
|      None |

### Увеличить громкость   
| volumeup |
|:---------|
|        + |
|     None |
|        + |
|     None |

### Уменьшить громкость   
| volumedown |
|:-----------|
|          + |
|       None |
|          + |
|       None |

### Поставить медиафайл на паузу   
| playpause |
|:----------|
|         + |
|      None |
|         + |
|      None |


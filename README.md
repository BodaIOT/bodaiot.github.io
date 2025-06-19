# CatPilot

![Static Badge](https://img.shields.io/badge/diemonic1-CatPilot-CatPilot)
![GitHub top language](https://img.shields.io/github/languages/top/diemonic1/CatPilot)
![GitHub](https://img.shields.io/github/license/diemonic1/CatPilot)
![GitHub Repo stars](https://img.shields.io/github/stars/diemonic1/CatPilot)
![GitHub issues](https://img.shields.io/github/issues/diemonic1/CatPilot)

[Documentation on english](#Documentation-on-english)

[Документация на русском языке](#Документация-на-русском-языке)

# Documentation on english

# Документация на русском языке
Это программа позволяет управлять Windows посредством VBS скриптов через локальную сеть или публичный IP (на подобии webhooks), или с помощью телеграмм бота

[Как писать скрипты](#Как-писать-скрипты)

[Эмуляция-нажатий-клавиш](#Эмуляция-нажатий-клавиш)

[Готовые примеры скриптов](#Готовые-примеры-скриптов)

[Автозапуск программы](#Автозапуск-программы)

[Интеграция с телеграмм ботом](#Интеграция-с-телеграмм-ботом)

## Как писать скрипты   
VBS позволяет реализовать большинство полезных скриптов. Вот обыкновенный шаблон для скрипта:   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run("")
```
   
С помощью WShell.Run("") можно запускать любые команды, в том числе и выполнение .bat скриптов, пайтон скриптов или просто команд для cmd.   

> [!TIP]
> Чтобы при запуске пайтон скрипт не показывал консоль, а исполнялся в фоне, достаточно переименовать файл скрипта ScriptName.py в ScriptName.pyw, изменив расширение   
   
Для обозначения комментария внутри VBS можно использовать символ '   
Комментарии будут выделяться цветом в редакторе   
   
В качестве имени скрипта вы можете любые символы UTF-8, в том числе и текстовые смайлики 😻.   
   
URL скрипта может состоять только из латинских символов и цифр. Имена или URL двух разных скриптов дублироваться не могут.   
   
Именно по URL вы можете запустить выполнение скрипта.   
   
### Пример   
Я создаю скрипт с URL="RunNotepad" и именем "📄 Запустить блокнот 📄":   
```
Dim WShell
Set WShell = CreateObject("WScript.Shell")

WShell.Run("notepad.exe")
```
   
> [!TIP]
> Скрипты, имена и URL можно вставлять и копировать, если включен ввод на английском языке

IP адрес моего компьютера в локальной сети - 192.168.0.102, значит, запустить скрипт я могу создав GET-запрос (открыв в браузере, например) к 192.168.0.102:5000/RunNotepad   
после этого у меня откроется блокнот   

> [!IMPORTANT]
> Ваш роутер может динамически присваивать устройствам IP адреса, поэтому, чтобы не менять каждый раз ссылку, по который вы запускается команды, либо отключите динамическое распределение в его настройках, либо закрепите за своим устройством конкретный IP   
   
## Эмуляция нажатий клавиш
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

## Автозапуск программы
Чтобы программа автоматически запускалась при старте Windows, создайте ярлык программы CatPilot.exe и поместите его в папку автозагрузки Windows
```
C:\Users\Имя_пользователя\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

## Интеграция с телеграмм ботом
Вы также можете выполнять команды с помощью телеграмм бота. При отправке команд таким образом не обязательно находиться в одной локальной сети с устройством.
Для начала необходимо создать собственного телеграмм бота. Можете назвать его как угодно, например, 🐾 CatPilot 🐾, и загрузить в качестве аватарки котика:

<img src="https://github.com/diemonic1/CatPilot/blob/main/CatPilot.png" width="250" />

После создания бота вы получите его токен (например 4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc)

Вставьте этот токен в настройки CatPilot

Бот будет выполнять команды только тех пользователей, чьи телеграмм ID указаны в настройках в списке разрешенных
Узнать ваш телеграмм ID вы можете у этого бота [@getmyid_bot](https://t.me/getmyid_bot)

## Быстрое открытие ссылки


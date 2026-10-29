# Repwise – Trainings- und Ernährungstracker

Öffentliche GitHub-Pages-Oberfläche für den persönlichen Tracker. Die Einträge werden in einem separaten, privaten Repository gespeichert.

## Einrichten

1. Öffne die Tracker-Seite und klicke oben auf **Nur lokal**.
2. Erstelle unter [Fine-grained personal access tokens](https://github.com/settings/personal-access-tokens/new) ein Token:
   - Resource owner: `timkick-dev`
   - Repository access: **Only select repositories** → `GYM-AI`
   - Repository permissions: **Contents — Read and write**
3. Füge den Token im Tracker ein und wähle **Verbinden & Daten synchronisieren**.

Das Token bleibt in `sessionStorage` des aktuellen Browser-Tabs und wird nicht in den öffentlichen Quellcode geschrieben. Bei einer neuen Browsersitzung muss es erneut eingefügt werden. Teile das Token nicht und committe es nie.

## Speicherung

Der Tracker synchronisiert Trainingseinheiten, Sätze, Wiederholungen, Gewichte, Fokusübungen, Plan, Mahlzeiten, Makros, Tagesziele, Check-ins und Körpergewicht nach jeder Änderung in `timkick-dev/GYM-AI/repwise-tracker.json`. Das Repository `GYM-AI` ist privat. Der Quellcode und die Pages-Oberfläche in `my-website` sind öffentlich.

Fotos werden aktuell nur lokal als Vorschau angezeigt und nicht ins Repository hochgeladen. Die automatische Foto-Makroerkennung ist noch nicht verbunden.

Bei mehreren gleichzeitigen Geräten versucht der Tracker, Änderungen zusammenzuführen. Der GitHub-Status oben zeigt, ob die letzte Speicherung abgeschlossen ist.

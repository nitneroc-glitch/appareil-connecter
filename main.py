def on_button_pressed_a():
    global Nombre, Chrono_pause, Mode_température, Mode_boussole
    if Mode == 1:
        Nombre += -1
    elif Mode == 2:
        Chrono_pause = 0
    elif Mode == 3:
        Mode_température = 0
    elif Mode == 4:
        Mode_boussole = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_logo_touched():
    global Mode, Afficher_mode
    Mode += 1
    Afficher_mode = 1
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

def on_button_pressed_b():
    global Nombre, Chrono_pause, Mode_température, Mode_boussole
    if Mode == 1:
        Nombre += 1
    elif Mode == 2:
        Chrono_pause = 1
    elif Mode == 3:
        Mode_température = 1
    elif Mode == 4:
        Mode_boussole = 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    if input.button_is_pressed(Button.AB):
        basic.show_string("" + name + str(value))
radio.on_received_value(on_received_value)

Mode_boussole = 0
Afficher_mode = 0
Mode_température = 0
Chrono_pause = 0
Mode = 0
radio.set_group(1)
Mode = 1
Chrono = 0
Chrono_pause = 0
Nombre = 0
Mode_température = 0
Afficher_mode = 1

def on_every_interval():
    global Chrono
    if Chrono_pause == 1:
        Chrono += 1
loops.every_interval(1000, on_every_interval)

def on_forever():
    global Afficher_mode
    if Mode == 1:
        if Afficher_mode == 1:
            basic.show_string("Cliqueur")
            Afficher_mode = 0
        basic.show_string("" + str((Nombre)))
        radio.send_value("Cliqueur", Nombre)
    elif Mode == 2:
        if Afficher_mode == 1:
            basic.show_string("Chrono ")
            Afficher_mode = 0
        basic.show_string("" + str((Chrono)))
        radio.send_value("Chrono", Chrono)
    elif Mode == 3:
        if Afficher_mode == 1:
            basic.show_string("Temperature ")
            Afficher_mode = 0
        if Mode_température == 0:
            basic.show_string("" + str((input.temperature())))
        elif Mode_température == 1:
            if input.temperature() < 18:
                basic.show_string("Il fait froid ")
            elif input.temperature() > 18 and input.temperature() < 30:
                basic.show_string("Il fait bon ")
            elif input.temperature() > 30:
                basic.show_string("Il fait chaud ")
        radio.send_value("Temperature ", input.temperature())
    elif Mode == 4:
        if Afficher_mode == 1:
            basic.show_string("Cliqueur")
            Afficher_mode = 0
        input.calibrate_compass()
        if Mode_boussole == 0:
            basic.show_string("" + str((input.compass_heading())))
        elif Mode_boussole == 1:
            basic.show_arrow(ArrowNames.NORTH)
        radio.send_value("Direction ", input.compass_heading())
basic.forever(on_forever)

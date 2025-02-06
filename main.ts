input.onButtonPressed(Button.A, function () {
    if (Mode == 1) {
        Nombre += -1
    } else if (Mode == 2) {
        Chrono_pause = 0
    } else if (Mode == 3) {
        Mode_température = 0
    } else if (Mode == 4) {
        Tempo += -5
    } else if (Mode == 5) {
        Mode_boussole = 0
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (Mode == 5) {
        Afficher_mode = 1
    } else {
        Mode += 1
    }
    Afficher_mode = 1
    music.stopAllSounds()
})
input.onButtonPressed(Button.B, function () {
    if (Mode == 1) {
        Nombre += 1
    } else if (Mode == 2) {
        Chrono_pause = 1
    } else if (Mode == 3) {
        Mode_température = 1
    } else if (Mode == 4) {
        Tempo += 5
    } else if (Mode == 5) {
        Mode_boussole = 1
    }
})
radio.onReceivedValue(function (name, value) {
    if (input.buttonIsPressed(Button.AB)) {
        basic.showString("" + name + value)
    }
})
let Mode_boussole = 0
let Afficher_mode = 0
let Mode_température = 0
let Chrono_pause = 0
let Mode = 0
radio.setGroup(1)
Mode = 1
let Chrono = 0
Chrono_pause = 0
let Nombre = 0
Mode_température = 0
Afficher_mode = 1
let Tempo = 150
basic.forever(function () {
    if (Mode == 1) {
        if (Afficher_mode == 1) {
            basic.showString("Cliqueur")
            Afficher_mode = 0
        }
        basic.showString("" + (Nombre))
        radio.sendValue("Cliqueur", Nombre)
    } else if (Mode == 2) {
        if (Afficher_mode == 1) {
            basic.showString("Chrono ")
            Afficher_mode = 0
        }
        basic.showString("" + (Chrono))
        radio.sendValue("Chrono", Chrono)
    } else if (Mode == 3) {
        if (Afficher_mode == 1) {
            basic.showString("Temperature ")
            Afficher_mode = 0
        }
        if (Mode_température == 0) {
            basic.showString("" + (input.temperature()))
        } else if (Mode_température == 1) {
            if (input.temperature() < 18) {
                basic.showString("Il fait froid ")
            } else if (input.temperature() > 18 && input.temperature() < 30) {
                basic.showString("Il fait bon ")
            } else if (input.temperature() > 30) {
                basic.showString("Il fait chaud ")
            }
        }
        radio.sendValue("Temperature ", input.temperature())
    } else if (Mode == 4) {
        if (Afficher_mode == 1) {
            basic.showString("Tempo :" + Tempo)
            Afficher_mode = 0
        }
        music.play(music.stringPlayable("E B C5 A B G A F ", Tempo), music.PlaybackMode.LoopingInBackground)
        basic.showString("" + (Tempo))
        radio.sendValue("Musique ", Tempo)
    } else if (Mode == 5) {
        if (Afficher_mode == 1) {
            basic.showString("Boussole ")
            Afficher_mode = 0
            input.calibrateCompass()
        }
        if (Mode_boussole == 0) {
            basic.showString("" + (input.compassHeading()))
        } else if (Mode_boussole == 1) {
            if (input.compassHeading() == 0) {
                basic.showArrow(ArrowNames.North)
            } else if (input.compassHeading() == 180) {
                basic.showArrow(ArrowNames.South)
            } else if (input.compassHeading() == 90) {
                basic.showArrow(ArrowNames.West)
            } else if (input.compassHeading() == 270) {
                basic.showArrow(ArrowNames.East)
            } else if (input.compassHeading() == 45) {
                basic.showArrow(ArrowNames.NorthWest)
            } else if (input.compassHeading() == 135) {
                basic.showArrow(ArrowNames.SouthWest)
            } else if (input.compassHeading() == 225) {
                basic.showArrow(ArrowNames.SouthEast)
            } else if (input.compassHeading() == 315) {
                basic.showArrow(ArrowNames.NorthEast)
            }
        }
        radio.sendValue("Direction ", input.compassHeading())
    }
})
basic.forever(function () {
    if (Mode == 4) {
        music.setVolume(input.soundLevel() / 1.5)
    }
})
loops.everyInterval(1000, function () {
    if (Chrono_pause == 1) {
        Chrono += 1
    }
})

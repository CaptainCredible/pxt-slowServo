input.onButtonPressed(Button.A, function () {
    slowservo.moveTo(180, 10)
})
input.onButtonPressed(Button.B, function () {
    slowservo.moveTo(0, 10)
})
let slowservo: slowServo.Servo = null
slowservo = slowServo.create(AnalogPin.P0)
slowservo.moveTo(1, 10)

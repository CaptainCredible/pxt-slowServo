/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace slowServo {
    export class Servo {
        private currentPosition: number;
        private pin: AnalogPin;

        constructor() {
            this.currentPosition = 90; // Default to middle position
        }

        /**
         * Set up the servo by setting the pin and initial position
         */
        setPin(servoPin: AnalogPin): void {
            this.pin = servoPin;
            pins.servoWritePin(this.pin, this.currentPosition);  // Use this.pin here
        }

        /**
         * Move the servo to a target position gradually
         * @param targetPosition the target angle to move to, eg: 90
         * @param step delay between steps in milliseconds, eg: 10
         * @parts=microservo trackArgs=0
         */
        //% block
        moveTo(targetPosition: number, step: number): void {
            const increment = targetPosition > this.currentPosition ? 1 : -1;
            control.inBackground(function () {
                while (this.currentPosition != targetPosition) {
                    this.currentPosition += increment;
                    // Ensure this.pin is used here
                    pins.servoWritePin(this.pin, this.currentPosition);
                    basic.pause(step); // Slow down the motion
                }
            })

        }

        /**
         * Return the current servo position
         */
        //% block
        getPosition(): number {
            return this.currentPosition;
        }
    }

    /**
     * Create a new Servo driver for the specified pin.
     * @param servoPin the pin where the servo is connected
     */
    //% blockId="slowServo_create" block="slowServo at pin %servoPin"
    //% weight=90 blockGap=8
    //% blockSetVariable=slowservo
    export function create(servoPin: AnalogPin): Servo {
        let servo = new Servo();
        servo.setPin(servoPin); // Initialize the pin
        return servo;
    }
}
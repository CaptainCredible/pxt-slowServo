/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

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
            pins.servoWritePin(this.pin, this.currentPosition);
        }

        /**
         * Move the servo to a target position gradually
         * @param targetPosition the target angle to move to, eg: 90
         * @param step delay between steps in milliseconds, eg: 10
         */
        //% block
        moveTo(targetPosition: number, step: number): void {
            const increment = targetPosition > this.currentPosition ? 1 : -1;

            while (this.currentPosition != targetPosition) {
                this.currentPosition += increment;
                pins.servoWritePin(this.pin, this.currentPosition);
                basic.pause(step); // Slow down the motion
                led.plotBarGraph(this.currentPosition,180)
            }
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
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
        constructor(servoPin: AnalogPin) {
            this.pin = servoPin;
            this.currentPosition = 90; // Default to middle position
            pins.servoWritePin(this.pin, this.currentPosition); // Set initial position
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
     * Create a new servo instance
     * @param servoPin the pin where the servo is connected
     */
    //% block
    export function create(servoPin: AnalogPin): Servo {
        return new Servo(servoPin);
    }
}
import { CheckIcon, Stepper, type DefaultMantineColor } from '@mantine/core';
import { XCircleIcon } from '@phosphor-icons/react';

interface StatusStepperProps {
    active: number;
}

export const StatusStepper = ({ active }: StatusStepperProps) => {
    const color = (): DefaultMantineColor => {
        if (active < 0) return 'red';
        if (active === 0 || active === 1) {
            return 'blue';
        }
        if (active == 2) {
            return 'yellow';
        }
        return 'green';
    };
    if (active < 0) {
        return (
            <Stepper
                radius='md'
                size='sm'
                active={0}
                iconPosition='right'
                completedIcon={<CheckIcon size={20} />}
            >
                <Stepper.Step
                    label={'Шаг 1'}
                    description={'Принять заявку'}
                    color='red'
                    styles={{
                        stepIcon: { borderColor: 'red', backgroundColor: 'red', color: 'white' },
                    }}
                    icon={<XCircleIcon size={20} />}
                />
                <Stepper.Step label={'Шаг 2'} description={'Заявка на рассмотрении'} />
                <Stepper.Step label={'Шаг 3'} description={'Заявка обработана'} />
            </Stepper>
        );
    }
    return (
        <Stepper
            radius='md'
            size='sm'
            color={color()}
            active={active}
            iconPosition='right'
            completedIcon={<CheckIcon size={12} />}
        >
            <Stepper.Step label={'Шаг 1'} description={'Принять заявку'} />
            <Stepper.Step label={'Шаг 2'} description={'Заявка на рассмотрении'} />
            <Stepper.Step label={'Шаг 3'} description={'Заявка обработана'} />
        </Stepper>
    );
};

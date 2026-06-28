import { CheckIcon, Stepper, type DefaultMantineColor, type MantineSize } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { XCircleIcon } from '@phosphor-icons/react';

interface StatusStepperProps {
    active: number;
}

export const StatusStepper = ({ active }: StatusStepperProps) => {
    const isMobile = useMediaQuery('(max-width: 48em)');

    const color = (): DefaultMantineColor => {
        if (active < 0) return 'red';
        if (active === 0 || active === 1) return 'blue';
        if (active === 2) return 'yellow';
        return 'green';
    };

    const stepperSize: MantineSize = isMobile ? 'xs' : 'sm';
    const iconSize = isMobile ? 16 : 20;
    const checkIconSize = isMobile ? 10 : 12;

    const stepperProps = {
        radius: 'md' as const,
        size: stepperSize,
        iconPosition: 'right' as const,
        completedIcon: <CheckIcon size={checkIconSize} />,
        breakpoint: 'sm' as const,
    };

    if (active < 0) {
        return (
            <Stepper
                {...stepperProps}
                active={1}
                orientation={isMobile ? 'vertical' : 'horizontal'}
            >
                <Stepper.Step label='Шаг 1' description='Отправлена на модерацию' />
                <Stepper.Step
                    label='Шаг 2'
                    description='Заявка принята'
                    color='red'
                    styles={{
                        stepIcon: {
                            borderColor: 'red',
                            backgroundColor: 'red',
                            color: 'white',
                        },
                    }}
                    icon={<XCircleIcon size={iconSize} />}
                />
                <Stepper.Step label='Шаг 3' description='Заявка на рассмотрении' />
                <Stepper.Step label='Шаг 4' description='Заявка обработана' />
            </Stepper>
        );
    }

    return (
        <Stepper
            {...stepperProps}
            color={color()}
            active={active}
            orientation={isMobile ? 'vertical' : 'horizontal'}
        >
            <Stepper.Step label='Шаг 1' description='Отправлена на модерацию' />
            <Stepper.Step label='Шаг 2' description='Заявка принята' />
            <Stepper.Step label='Шаг 3' description='Заявка на рассмотрении' />
            <Stepper.Step label='Шаг 4' description='Заявка обработана' />
        </Stepper>
    );
};

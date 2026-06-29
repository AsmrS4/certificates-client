import { Button, Group, Modal, Textarea } from '@mantine/core';
import { useState } from 'react';

interface CommentModalProps {
    stack: any;
    callback: (msg: string) => Promise<void>;
}

export const CommentModal = ({ stack, callback }: CommentModalProps) => {
    const [comment, setComment] = useState('');
    return (
        <>
            <Modal.Stack>
                <Modal
                    centered
                    size={'lg'}
                    padding={'lg'}
                    {...stack.register('reject-action')}
                    title='Отклонить заявку'
                >
                    <Textarea
                        data-autofocus
                        variant='filled'
                        size='md'
                        label='Причина'
                        labelProps={{ mb: 12 }}
                        withAsterisk
                        placeholder='Укажите причину'
                        resize='vertical'
                        required
                        autosize
                        minRows={6}
                        maxRows={12}
                        onChange={(event) => setComment(event.currentTarget.value)}
                    />

                    <Group mt='lg' justify='flex-end'>
                        <Button onClick={stack.closeAll} variant='default'>
                            Отмена
                        </Button>
                        <Button
                            disabled={comment.trim() === ''}
                            onClick={() => {
                                if (comment) stack.open('confirm-action');
                            }}
                            color='red'
                        >
                            Отклонить
                        </Button>
                    </Group>
                </Modal>

                <Modal centered {...stack.register('confirm-action')} title='Подтвердите действие'>
                    Вы уверены, что хотите отклонить заказ справки?
                    <Group mt='lg' justify='flex-end'>
                        <Button onClick={stack.closeAll} variant='default'>
                            Отмена
                        </Button>
                        <Button
                            onClick={async () => {
                                await callback(comment);
                                stack.closeAll();
                            }}
                            color='red'
                        >
                            Подтвердить
                        </Button>
                    </Group>
                </Modal>
            </Modal.Stack>
        </>
    );
};

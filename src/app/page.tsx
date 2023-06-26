'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import styles from './page.module.css';

const schema = Yup.object().shape({
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Campo obrigatório'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas precisam ser iguais').required('Campo obrigatório')
})

export default function Home() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const { errors, isSubmitting } = formState;
  console.log('erros', errors)

  const handleSubmitFormData = (data: any) => {
    console.log('submit', data)

    reset();
  }
  
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleSubmitFormData)}>
        <h2>Reset Password</h2>

        <input {...register('password')} type="password" placeholder="Insira sua senha" />
        <input {...register('confirmPassword')} type="password" placeholder="Confirme sua senha" />
        <button type="submit">{isSubmitting ? 'Enviando...' : 'Enviar'}</button>

        {errors.password && <p>{errors.password.message}</p>}
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </form>
    </div>
  )
}

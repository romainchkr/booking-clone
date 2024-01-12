import React, { createContext, useContext } from 'react';
import { CheckEmailExistUseCase } from '@/src/domain/useCases/user/checkEmailExist.usecase';
import { FirebaseUserRepository } from '@/src/infrastructure/repositories/firebaseUser.repository';

interface Props {
  children: React.ReactNode;
}

const UseCasesContext = createContext<{
  checkEmailExistUseCase: CheckEmailExistUseCase;
} | null>(null);

export const UseCasesProvider: React.FC<Props> = ({ children }) => {
  const userRepository = new FirebaseUserRepository();
  const checkEmailExistUseCase = new CheckEmailExistUseCase(userRepository);

  return (
    <UseCasesContext.Provider value={{ checkEmailExistUseCase }}>
      {children}
    </UseCasesContext.Provider>
  );
};

export const useUseCases = () => {
  const context = useContext(UseCasesContext);
  if (!context) {
    throw new Error('useUseCases must be used within a UseCasesProvider');
  }
  return context;
};

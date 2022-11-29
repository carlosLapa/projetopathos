/**Componente para ajudar a compreender o conceito de children (sub-elementos) e a sua relação com React.ReactNode
 * Ou seja, consiste numa estrutura de sub-elementos no DOM (Document Object Model -> representa a web page como uma estrutura-árvore)
 * que permite depois passar estes componentes para onde quisermos.
 *  */ 

type Props = {
  price: number;
  children: React.ReactNode;
};

const TestChildren = ({ price, children }: Props) => {
  return (
    <>
      {children}
      <h1>Preço = {price}</h1>
      {children}
    </>
  );
};

export default TestChildren;

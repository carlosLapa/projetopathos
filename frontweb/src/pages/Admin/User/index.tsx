import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

const Users = () => {
  const [page, setPage] = useState<SpringPage<User>>();

  /*O argumento "withCredentials" indica se a requisição é autorizada ou não.
  Se for, indica que temos que ir ao localStorage, buscar o token e passá-lo no header (Authorization - ver os detalhes no PostMan)
   */

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/users',
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div>
      {page?.content.map((item) => (
        <p key={item.id}>{item.email}</p>
      ))}
    </div>
  );
};

export default Users;

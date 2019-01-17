import React from 'react';
import Gitalk from 'gitalk/dist/gitalk-component';
import gitalkBaseConfig from '../../constants/gitalk.config';

import 'gitalk/dist/gitalk.css';

interface Props {
  id: string;
}

function Comments(props: Props) {
  const { id } = props;

  const options = {
    ...gitalkBaseConfig,
    id,
    title: id,
  };

  return <Gitalk key={id} options={options} />;
}

export default React.memo(Comments);

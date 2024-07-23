import { IUniversity } from '../../models/university.model';

function University(university: IUniversity) {
  return (
    <div className='shadow-xl rounded-lg bg-white bg-opacity-50 text-left'>
      <div className='h-20 bg-white bg-opacity-50 rounded-t-lg text-3xl flex items-center justify-center'>
        {university.alpha_two_code}
      </div>

      <div className='p-4 flex flex-col items-start justify-end'>
        <a
          href={university.web_pages[0]}
          className='hover:underline'
          target='_blank'
          rel='noreferrer noopener'>
          {university.name}
        </a>
        <p className='text-sm'>
          {university['state-province'] ? <span>{university['state-province']},&nbsp;</span> : null}
          {university.country}
        </p>
      </div>
    </div>
  );
}

export default University;

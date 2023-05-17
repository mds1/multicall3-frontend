export const ExternalLink = (props: { href: string; text: string }) => {
  return (
    <a href={props.href} className='hyperlink' target='_blank' rel='noopener noreferrer'>
      {props.text}
    </a>
  );
};

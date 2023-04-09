interface IButtonProps {
  text: string;
}

export const Button = ({ text }: IButtonProps): JSX.Element => {
  return <button className="button outline">{text}</button>;
};

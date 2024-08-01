const ContactsContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f343b] w-full ">
      <div className="pt-3">
        <img src={""} alt="logo" />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="##direct messages"/>
        </div>
      </div>



      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="##channels"/>
        </div>
      </div>
    </div>
  );
};

export default ContactsContainer;


interface text{
  text: string | number
}
const Title = ({text}: text) => {
  return (
    <h4 className="uppercase tracking-videst text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h4>
  )
}

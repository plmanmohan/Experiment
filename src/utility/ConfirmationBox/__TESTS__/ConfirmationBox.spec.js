import  ConfirmationBox  from "../ConfirmationBox";

describe('Test ConfirmationBox component', () => {
  it('renders alert box without crashing', () => {
    const wrapper = shallow(
        <ConfirmationBox onClick={() => {}} message={ "Error in Loading!"} isAlert={true}/>
    ); 
    const p = wrapper.find("p");
    expect(p.text()).toEqual("Error in Loading!");
  });
  it('check alert box title without crashing', () => {
    const wrapper = shallow(
        <ConfirmationBox onClick={() => {}} message={ "Error in Loading!"} isAlert={true}/>
    ); 
    const h = wrapper.find("h3");
    expect(h.text()).toEqual("Error Message");
  });

  it('calls Ok event on click of Ok button in alert box', () =>{
    const onClick = jest.fn();
    let wrapper = mount( <ConfirmationBox onClick={() => {onClick(true)}} message={ "Error in Loading!"} isAlert={true}/>);
    
    wrapper.find('button').simulate('click');
    expect(onClick).toBeCalledWith(true)
  })

  it('renders confirmation box without crashing', () => {
    const wrapper = shallow(
        <ConfirmationBox onClick={() => {}} message="Are you sure you want to delete the user!" isAlert={false}/>
    ); 
    const p = wrapper.find("p");
    expect(p.text()).toEqual("Are you sure you want to delete the user!");
  });

  it('check confirm box title without crashing', () => {
    const wrapper = shallow(
      <ConfirmationBox onClick={() => {}} message="Are you sure you want to delete the user!" isAlert={false}/>
    ); 
    let h = wrapper.find("h3");
    expect(h.text()).toEqual("Delete the User");
  });

  it('calls yes event on click of yes button in confirmation box', () =>{
    const onClick = jest.fn();
    let wrapper = mount( <ConfirmationBox onClick={() => {onClick(true)}} message={ "Are you sure you want to delete the user!"} isAlert={false}/>);
    
    wrapper.find('button').first().simulate('click');
    expect(onClick).toBeCalledWith(true)
  })
  it('calls Cancel event on click of cancel button in confirmation box', () =>{
    const onClick = jest.fn();
    let wrapper = mount( <ConfirmationBox onClick={() => {onClick(false)}} message={ "Are you sure you want to delete the user!"} isAlert={false}/>);

    wrapper.find('button').first().simulate('click');
    expect(onClick).toBeCalledWith(false)
  })

  it('calls close event on click of close button in confirmation box', () =>{
    const onClick = jest.fn();
    let wrapper = mount( <ConfirmationBox onClick={() => {onClick(false)}} message={ "Are you sure you want to delete the user!"} isAlert={false}/>);

    wrapper.find('h2').simulate('click');
    expect(onClick).toBeCalledWith(false)
  })
  
 });


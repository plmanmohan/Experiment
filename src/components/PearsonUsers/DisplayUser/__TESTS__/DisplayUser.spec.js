import  DisplayUser  from "../DisplayUser";

describe('Test DisplayUser component', () => {
  it('renders without crashing', () => {
    const user = { id: 11, first_name: "George", last_name: "Edwards", avatar: "128.jpg" }
     const wrapper = shallow(
      <DisplayUser onClick={() => {}} data={user}/>
    ); 
    const h = wrapper.find("h1");
    expect(h.text()).toEqual("George Edwards");
  });

  it('calls onDelete event on click of delete button', () =>{
    const user = { id: 11, first_name: "George", last_name: "Edwards", avatar: "128.jpg" }
    const onClick = jest.fn();
    let wrapper = mount(<DisplayUser onClick={() => {onClick(11)}} data={user}/>);
    
    wrapper.find('p').simulate('click');
    expect(onClick).toBeCalledWith(11)
  })
  
 });


import  PearsonUsers  from "../PearsonUsers";
import { removeUser, removeDuplicateUsers } from "../../../utility/user-functions";

//mock test for api
jest.mock('../../../utility/api');

describe('Test PearsonUsers component', () => {

  it('renders PearsonUsers without crashing', () => {
    shallow(<PearsonUsers />);
  });

  it('api() call test', () => {
    return api().then(data => {
      expect(data).toStrictEqual({
        "data":{ 
                id: 4,
                first_name: "Eve",
                last_name: "Holt",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        }
      });
    });
  });

  it("Render Heading text test", () => {
    const wrapper = shallow(<PearsonUsers />);
    expect(wrapper).toMatchSnapshot();
    const h1 = wrapper.find("h1");
    expect(h1.text()).toEqual("Pearson User Management ");
  });

  //remove duplicated users from the state add only unique into state
  it("removeDuplicateUsers removes duplicates adds unique users into state and ", () => {
    const oldUserList = [
      { id: 2, first_name: "Janet", last_name: "Weaver", avatar: "128.jpg" },
      { id: 3, first_name: "Emma", last_name: "Wong", avatar: "128.jpg" }
    ];
    const newUserList = [
      { id: 12, first_name: "Rachel", last_name: "Howell", avatar: "128.jpg" },
      { id: 2, first_name: "Janet", last_name: "Weaver", avatar: "128.jpg" }
    ];
    const finalUserList = removeDuplicateUsers(oldUserList, newUserList);
    expect(finalUserList).toEqual([
      { id: 2, first_name: "Janet", last_name: "Weaver", avatar: "128.jpg" },
      { id: 3, first_name: "Emma", last_name: "Wong", avatar: "128.jpg" },
      { id: 12, first_name: "Rachel", last_name: "Howell", avatar: "128.jpg" }
    ]);
  });

  //removeUser method is tested
  it("removeUser removes the user", () => {
    const state = {
      users: [                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {
          id: 2,
          first_name: "Janet",
          last_name: "Weaver",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
        },
        {
          id: 3,
          first_name: "Emma",
          last_name: "Wong",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
        },
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        }
      ]
    };
    const id = 3;
    const finalState = removeUser(state.users, id);
    expect(finalState).toEqual([
      {
        id: 2,
        first_name: "Janet",
        last_name: "Weaver",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
      },
      {
        id: 4,
        first_name: "Eve",
        last_name: "Holt",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
      }
    ]);
  });
  

  //disableErrorBox
  it("disableErrorBox is tested", () => {
    const wrapper = shallow(<PearsonUsers />);
    wrapper.setState({ error: true }, () => {
      wrapper.instance().disableErrorBox(true);
      const userState = wrapper.state('error');
      expect(userState).toEqual(false);
    })
  });

  //selectUserToRemove
  it("selectUserToRemove is tested", () => {
    const wrapper = shallow(<PearsonUsers />);
    wrapper.setState({ showConfirmationBox: false, currentId: -1 }, () => {
      wrapper.instance().selectUserToRemove(2);
      const currentUserId = wrapper.state('currentId');
      expect(currentUserId).toEqual(2);
    })
  });

  //removeUser
  it("removeUser is tested", () => {
    const wrapper = shallow(<PearsonUsers />);
    wrapper.setState({ showConfirmationBox: true, currentId: 2 }, () => {
      wrapper.instance().removeUser(true);
      const currentUserId = wrapper.state('currentId');
      expect(currentUserId).toEqual(null);
    })
  });
});



export const BaseURL = "http://188.225.184.108:9091";
export const API_URL = BaseURL+'/api/Account';

export const API_URL_Yaboos = BaseURL+'/api';


export class END_POINTS {
    // yaboos  API
    public static login = API_URL+"/login";
    public static albumCategories = API_URL_Yaboos+"/albumCategories/admin";

    
    public static albums = API_URL_Yaboos+"/albums/admin";


    public static languages = API_URL_Yaboos+"/languages/admin";
    public static songs = API_URL_Yaboos+"/songs/admin";
    public static artists = API_URL_Yaboos+"/artists/admin";

    public static passwordreset = API_URL+"/passwordreset";
    public static users = API_URL+"/admin";

    public static notification  = API_URL_Yaboos+"/notifications/admin/pushToAll";

    
    public static annonce  = API_URL_Yaboos+"/advertisements/admin";
    
    public static setting  = API_URL_Yaboos+"/configuration/admin";
  
    public static Slider  = API_URL_Yaboos+"/sliders/admin";
}



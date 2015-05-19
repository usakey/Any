 
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
 
public class WordList {
 
    public static List<String> getWordListFromFile(String fileName){
 
        FileInputStream fis = null;
        DataInputStream dis = null;
        BufferedReader br = null;
        List<String> wordList = new ArrayList<String>();
        try {
            fis = new FileInputStream(fileName);
            dis = new DataInputStream(fis);
            br = new BufferedReader(new InputStreamReader(dis));
            String line = null;
            while((line = br.readLine()) != null){
                StringTokenizer st = new StringTokenizer(line, " ,.;:\"()<>'");
                //ommitted words
                while(st.hasMoreTokens()){
                    String tmp = st.nextToken().toLowerCase() ;
                    if(tmp.length()>30){tmp = tmp.substring(0,29);}
                       wordList.add(tmp);
                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally{
            try{if(br != null) br.close();}catch(Exception ex){}
        }
        return wordList;
    }
    
    public static void show(List<String> wordlist){
    	 for(String str:wordlist){
           System.out.println(str);
       }
    }
     

     
//    public static void main(String a[]){
//         
//        List<String> list = WordList.getWordList("D:\\My Documents\\eclipse_workspace\\Index\\data\\txt\\mit.txt");
//        for(String str:list){
//            System.out.println(str);
//        }
//    }
}
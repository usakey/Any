import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;

import org.apache.tika.Tika;
import org.apache.tika.metadata.HttpHeaders;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.sax.BodyContentHandler;


public class TikaReader {
	public static String getContent(File file){
			InputStream is = null;
			try {
				is = new FileInputStream(file);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
			Metadata metadata = new Metadata();
			BodyContentHandler ch = new BodyContentHandler();
			AutoDetectParser parser = new AutoDetectParser();

			String mimeType = null;
			try {
				mimeType = new Tika().detect(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
			metadata.set(HttpHeaders.CONTENT_TYPE, mimeType);

			try {
				parser.parse(is, ch, metadata, new ParseContext());
				is.close();
			} catch (Exception e) {
				e.printStackTrace();
			}

			return ch.toString() ;
		}
	
	public static Reader getReader(File file){
		Reader reader = null;
		try {
			 reader = new Tika().parse(file) ;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return reader;
	}
}

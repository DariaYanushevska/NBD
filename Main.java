import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class Main {

    private static CloseableHttpClient client;

    public static void main(String[] args) throws Exception {
        client = HttpClientBuilder.create().build();

        JSONObject element = new JSONObject();
        element.put("name", "Daria");
        element.put("surname", "Yanushevska");
        element.put("height", 174);
        element.put("weight", 61.8);

        // 1. wgranie dokumentu
        addModifyElement("Daria", element);
        // 2. pobieranie dokumentu
        JSONObject element1 = getElement("Daria");
        System.out.println(element1.toString(4));
        // 3. modify element
        element1.put("surname", "Anshevska");
        addModifyElement("Daria", element1);
        // 4. pobieranie dokumentu
        JSONObject element2 = getElement("Daria");
        System.out.println(element2.toString(4));
        // 5. usuwanie elementu
        deleteElement("Daria");
        // 4. pobieranie dokumentu
        JSONObject element3 = getElement("Daria");
        System.out.println(element3.toString(4));
    }

    private static void addModifyElement(String key, JSONObject element) throws IOException {
        HttpPut request = new HttpPut("http://localhost:8098/buckets/s25335/keys/" + key);

        request.setHeader("Content-type", "application/json");
        request.setEntity(new StringEntity(element.toString()));

        CloseableHttpResponse execute = client.execute(request);
        System.out.println(execute.getStatusLine());
        HttpEntity entity = execute.getEntity();
        if (entity != null) System.out.println(EntityUtils.toString(entity));
    }

    private static JSONObject getElement(String key) throws Exception {
        HttpGet request = new HttpGet("http://localhost:8098/buckets/s25335/keys/" + key);

        CloseableHttpResponse execute = client.execute(request);
        System.out.println(execute.getStatusLine());
        HttpEntity entity = execute.getEntity();

        String answer = EntityUtils.toString(entity);
        try {
            return new JSONObject(answer);
        } catch (JSONException e) {
            throw new Exception(answer);
        }
    }

    private static void deleteElement(String key) throws IOException {
        HttpDelete request = new HttpDelete("http://localhost:8098/buckets/s25335/keys/" + key);

        CloseableHttpResponse execute = client.execute(request);
        System.out.println(execute.getStatusLine());
        HttpEntity entity = execute.getEntity();
        if (entity != null) System.out.println(EntityUtils.toString(entity));
    }
}

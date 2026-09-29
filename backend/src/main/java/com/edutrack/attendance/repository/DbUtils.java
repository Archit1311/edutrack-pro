package com.edutrack.attendance.repository;

import org.springframework.jdbc.support.KeyHolder;
import java.util.Map;

public class DbUtils {
    public static Long extractGeneratedId(KeyHolder keyHolder) {
        if (keyHolder == null) return null;

        if (keyHolder.getKeys() != null) {
            for (Map.Entry<String, Object> entry : keyHolder.getKeys().entrySet()) {
                if (entry.getKey().equalsIgnoreCase("id") && entry.getValue() instanceof Number num) {
                    return num.longValue();
                }
            }
        }

        if (keyHolder.getKeyList() != null && !keyHolder.getKeyList().isEmpty()) {
            Map<String, Object> first = keyHolder.getKeyList().get(0);
            for (Map.Entry<String, Object> entry : first.entrySet()) {
                if (entry.getKey().equalsIgnoreCase("id") && entry.getValue() instanceof Number num) {
                    return num.longValue();
                }
            }
        }

        try {
            Number num = keyHolder.getKey();
            if (num != null) return num.longValue();
        } catch (Exception ignored) {}

        return null;
    }
}

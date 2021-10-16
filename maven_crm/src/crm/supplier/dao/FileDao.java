package crm.supplier.dao;

import crm.pojo.FileCenter;

import java.util.List;

public interface FileDao {
    List<FileCenter> findall();//查看所有
    FileCenter findById(int id);//通过id查看所有的东西

    boolean delete(int id);
    boolean add(FileCenter fileCenter);

    int  findByMax();

    boolean modify(FileCenter fileCenter);

    List<FileCenter> findByMohu(String s);
}

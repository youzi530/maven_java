package crm.sale.zdr.dao;

import crm.pojo.CostAnalysis;

import java.util.List;

public interface CostAnalysisDao {
    List<CostAnalysis> findAll();
    List<CostAnalysis> findByMohu(String sName);
}

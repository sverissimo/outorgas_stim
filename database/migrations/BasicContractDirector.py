#from migrations.ContractsBuilder import ContractsBuilder
from database.migrations.ContractsBuilder import ContractsBuilder


class BasicContractDirector():

    @staticmethod
    def construct(empresas):
        return ContractsBuilder() \
            .excel_to_dataframe('data/Contratos DGTI.xlsx') \
            .rename_and_filter_columns() \
            .df_to_list()    \
            .add_empresa_data(empresas) \
            .build()
